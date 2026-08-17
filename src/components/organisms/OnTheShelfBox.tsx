import { books } from '../../data/content'
import { SidebarBox } from '../molecules/SidebarBox'
import { BookItem } from '../molecules/BookItem'
import { ArrowLink } from '../atoms/ArrowLink'
import { BookIcon } from '../icons/Icons'

export function OnTheShelfBox() {
  return (
    <SidebarBox title="On the Shelf" tag="Reading">
      <BookIcon className="shelf-icon" />
      <ul className="book-list">
        {books.map((book) => (
          <BookItem key={book} title={book} />
        ))}
      </ul>
      <ArrowLink href="#journal" className="mt-4">
        See my reading list
      </ArrowLink>
    </SidebarBox>
  )
}
