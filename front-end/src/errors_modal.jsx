import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import i18next from 'i18next'

export class ErrorsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true
    }

    this.handleClose = this.handleClose.bind(this)
  }

  // componentDidMount () {
  // }

  // componentWillUnmount () {
  // }

  handleClose () {
    this.setState({show: false})
  }

  render () {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
    return (
      <Modal.ModalDialog>
        <Modal.Header closeButton>
            <Modal.ModalTitle>{i18next.t('errors_modal')}</Modal.ModalTitle>
        </Modal.Header>
        <Modal.ModalBody>

        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button variant='secondary'>
            {i18next.t('close')}
          </Button>
        </Modal.ModalFooter>
      </Modal.ModalDialog>
    )
  }
}

// const ErrorsModal = ({
//   displayName: 'Errors',
//   mapPropsToValues: props => {
//     return {
//       value: props.defaultValue || 0
//     }
//   }
// })(ErrorsModal)

export default ErrorsModal
