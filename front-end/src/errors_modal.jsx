import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Errors from './configuration/errors'
import i18next from 'i18next'

export class ErrorsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: this.props.show
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  handleClose () {
    window.history.pushState({},'','/')
    this.setState({show: false})
  }

  handleExit () {
    this.props.refresh()
  }

  renderModal() {
    return (
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          onExit={this.handleExit}
          backdrop='static'
          scrollable={true}
          size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>{i18next.t('errors_modal')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Errors />
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
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        onExit={this.handleExit}
        backdrop="static"
        >
        <Modal.Header closeButton>
          <Modal.Title>{i18next.t('errors_modal')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Errors />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            {i18next.t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default withRouter(ErrorsModal)
