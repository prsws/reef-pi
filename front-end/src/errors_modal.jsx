import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import i18next from 'i18next'

export class ErrorsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: this.props.show
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }


  handleShow() {
    this.setState({show: true})
  }

  handleClose () {
    window.history.pushState({},'','/')
    this.setState({show: false})
    this.props.pageReload()
  }

  renderModal() {
    return (
        <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{i18next.t('errors_modal')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  {i18next.t('close')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
  }

  render () {
    return (
        this.renderModal()
      )
  }
}

export default withRouter(ErrorsModal)
