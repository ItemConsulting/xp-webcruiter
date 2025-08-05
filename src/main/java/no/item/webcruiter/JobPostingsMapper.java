package no.item.webcruiter;

import com.enonic.xp.script.serializer.MapGenerator;
import com.enonic.xp.script.serializer.MapSerializable;
import com.rometools.rome.feed.synd.SyndEntry;
import org.jdom2.Element;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public final class JobPostingsMapper implements MapSerializable {
  private final SyndEntry entry;
  private final Map<String, Element> foreignMarkupElements;


  public JobPostingsMapper(final SyndEntry entry) {
    this.entry = entry;

    foreignMarkupElements = new HashMap<>();
    entry.getForeignMarkup().forEach((element) -> foreignMarkupElements.put(element.getName(), element));
  }

  @Override
  public void serialize(final MapGenerator gen) {
    gen.value("@context", "https://schema.org/");
    gen.value("@type", "JobPosting");
    gen.value("title", entry.getTitle());
    gen.value("url", entry.getLink());
    gen.value("description", entry.getDescription().getValue());
    serializeText(gen, "AdvertId", "identifier");
    serializeText(gen, "date", "datePosted");
    serializeText(gen, "WePubDateTo", "validThrough");

    gen.map("hiringOrganization");
    gen.value("@type", "Organization");
    serializeText(gen, "company_name", "name");
    gen.end();

    gen.map("jobLocation");
    gen.value("@type", "Place");
    gen.map("address");
    serializeText(gen, "WorkplaceStreetAddress", "streetAddress");
    serializeText(gen, "WorkplacePostno", "postalCode");
    serializeText(gen, "WorkplacePostaddress", "addressLocality");
    serializeText(gen, "WorkplaceCounties", "addressRegion");
    serializeText(gen, "Culture_Id", "availableLanguage");
    gen.end();
    gen.end();

    serializeInteger(gen, "NumberOfPositions", "totalJobOpenings");
    serializeText(gen, "Qualification", "experienceRequirements");
    serializeText(gen, "PositionTitle", "name");
    serializeText(gen, "Personality", "skills");
    serializeText(gen, "ApplicableCondition", "employerOverview");
  }

  private void serializeText(final MapGenerator gen, final String name, final String key) {
    getForeignMarkupElement(name).ifPresent(val -> gen.value(key, val));
  }

  private void serializeInteger(final MapGenerator gen, final String name, final String key) {
    getForeignMarkupElement(name).flatMap(this::parseInt).ifPresent(val -> gen.value(key, val));
  }

  private Optional<String> getForeignMarkupElement(final String name) {
    return Optional.ofNullable(foreignMarkupElements.get(name)).flatMap(this::getInnerText);
  }

  private Optional<String> getInnerText(Element el) {
    String text = el.getTextTrim();

    return text.length() == 0
      ? Optional.empty()
      : Optional.of(text);
  }

  private Optional<Integer> parseInt(final String num) {
    try {
      return Optional.of(Integer.parseInt(num));
    } catch(NumberFormatException e) {
      return Optional.empty();
    }
  }
}
