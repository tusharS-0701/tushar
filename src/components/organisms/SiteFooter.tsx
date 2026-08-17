import { footerContent, navItems, recentMonths, siteMeta } from '../../data/content'
import { FooterColumn } from '../molecules/FooterColumn'
import { QuoteBox } from '../molecules/QuoteBox'

export function SiteFooter() {
  const archiveMonths = recentMonths(4)

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <FooterColumn heading="Editorial">
          <p>{footerContent.editorial}</p>
          <p className="mt-3">
            &copy; {siteMeta.currentYear} {siteMeta.name}
          </p>
        </FooterColumn>

        <FooterColumn heading="Sections">
          <ul>
            {footerContent.sections.map((section) => {
              const match = navItems.find((item) => item.label === section)
              return (
                <li key={section}>
                  <a href={match?.href ?? '#top'} className="link-underline">
                    {section}
                  </a>
                </li>
              )
            })}
          </ul>
        </FooterColumn>

        <FooterColumn heading="Archives">
          <ul>
            {archiveMonths.map((month) => (
              <li key={month}>{month}</li>
            ))}
          </ul>
        </FooterColumn>

        <QuoteBox text={footerContent.quote.text} author={footerContent.quote.author} />
      </div>

      <div className="footer-bottom">
        <p>
          {siteMeta.name} &copy; {siteMeta.currentYear}
        </p>
        <p>Documenting the journey</p>
      </div>
    </footer>
  )
}
