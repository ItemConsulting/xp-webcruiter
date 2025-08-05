package no.item.webcruiter;

import com.enonic.xp.lib.content.BaseContextHandler;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class WebcruiterHandler extends BaseContextHandler {
  private static final Logger LOG = LoggerFactory.getLogger( WebcruiterHandler.class );

  static String baseUrl = "https://www.webcruiter.no/webservices/Webcruiterculture.asmx/RSSFeed";

  private String id;

  public void setId(String id) {
    this.id = id;
  }

  @Override
  public List<JobPostingsMapper> doExecute() {
    try {
      URL feedUrl = new URL(baseUrl + "?company_id=" + id + "&cultureid=NB-NO");
      SyndFeedInput input = new SyndFeedInput();
      SyndFeed feed = input.build(new XmlReader(feedUrl));

      return feed.getEntries().stream().map( JobPostingsMapper::new ).collect( Collectors.toList() );
    } catch (Exception e) {
      LOG.error("Could not parse Webcruiter XML", e);
      return new ArrayList<>();
    }
  }
}
