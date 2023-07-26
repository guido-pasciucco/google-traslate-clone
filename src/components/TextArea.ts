import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

type Props =
  | { type: SectionType }

export const TextArea = ({ loading, type, value, onChange }) => {
    return(
        <Form.Control
            as='textarea'
            placeholder='Traducción'
            style={{ height: '150px' }}
        />
    )
}
