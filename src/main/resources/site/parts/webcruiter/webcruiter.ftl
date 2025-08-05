[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="locale" type="String" --]
[#-- @ftlvariable name="partId" type="String" --]
[#-- @ftlvariable name="jobPostings" type="java.util.ArrayList" --]
[#-- @ftlvariable name="job.id" type="String" --]
[#-- @ftlvariable name="job.url" type="String" --]
[#-- @ftlvariable name="job.lang" type="String" --]
[#-- @ftlvariable name="job.title" type="String" --]
[#-- @ftlvariable name="job.date" type="java.time.ZonedDateTime" --]

[#setting locale=locale]

<div class="webcruiter">
  [#if title?has_content]
    <h2 id="${partId}-title">${title}</h2>
  [/#if]

  [#list jobPostings]
    <ol
      [#if title?has_content]aria-labelledby="${partId}-title"[/#if]>
      [#items as job]
        <li>
          <a
            href="${job.url}"
            id="${job.id}"
            lang="${job.lang}">

            <h3>${job.title}</h3>

            <div class="webcruiter-valid-through">
              [@localize key="webcruiter.validThrough" locale=locale /]
              <time datetime="${job.date.format()}">
                ${job.date.format('SHORT_DATE')}
              </time>
            </div>
          </a>
        </li>
      [/#items]
    </ol>
  [#else]
    <p class="webcruiter-no-vacancies">
      [@localize key="webcruiter.noVacancies" locale=locale /]
    </p>
  [/#list]
</div>
