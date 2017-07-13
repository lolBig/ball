import Renderer from './renderer'
import ReactDOM from 'react-dom'
import React from 'react'
import mainStyle from './style_main'

export default class DialogRenderer extends Renderer {

    constructor(props) {
        super(props)
        this.node = null
        this.mouseMoveHandler = this.onMouseMoveTitle.bind(this)
        this.mouseDownHandler = this.onMouseDownTitle.bind(this)
        this.mouseUpHandler = this.onMouseUpTitle.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate()
        this.openDialog()
    }

    componentDidMount() {
        super.componentDidMount()
        this.node = document.createElement('div')
        this.node.className = mainStyle.dialog
        document.body.appendChild(this.node)
        this.openDialog()
        this.titleContainer.addEventListener(
            'mousedown',
            this.mouseDownHandler,
            false
        )
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.titleContainer.removeEventListener(
            'mousedown',
            this.mouseDownHandler
        )
        this.removeEventListeners()
        this.closeDialog()
    }

    openDialog() {
        let components = []
        if (this.state.title) {
            components.push(
                <div
                    ref={(ref)=>this.titleContainer=ref}
                    className={mainStyle.dialogTitle}>
                    <h4>
                        {this.state.title}
                        {
                            !this.state.hideClose &&
                            <svg
                                onClick={this.props.onClickClose}
                                aria-hidden="true">
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        }
                    </h4>
                </div>
            )
        }
        components.push(
            <div className={mainStyle.dialogContent}>
                <div>{this.renderContent()}</div>
            </div>
        )
        if (this.state.btns) {
            let btnComponents = []
            for (let btn of this.state.btns) {
                btnComponents.push(
                    <button
                        disabled={btn.disable}
                        ref={(ref) => this['btn' + btn.name] = ref}
                        onClick={btn.onClick}
                        className={btn.className}>
                        {btn.title}
                    </button>
                )
            }
            components.push(
                <div className={mainStyle.dialogButtons}>
                    <div>{btnComponents}</div>
                </div>
            )
        }
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <div
                style={this.state.style}
                ref={(ref) => this.dialogContainer = ref}
                className={mainStyle.dialogContainer}>{components}</div>,
            this.node
        )
    }

    closeDialog() {
        if (this.node) {
            ReactDOM.unmountComponentAtNode(this.node)
            document.body.removeChild(this.node)
            this.node = null
        }
    }

    renderContent() {
        return null
    }

    render() {
        return null
    }

    onMouseDownTitle(e) {
        this.diffX = e.screenX
        this.diffY = e.screenY
        let style = window.getComputedStyle(this.dialogContainer)
        let transform = style.getPropertyValue('transform').split(',', 6)
        this.translateX = parseInt(transform[4])
        this.translateY = parseInt(transform[5])
        document.addEventListener('mousemove', this.mouseMoveHandler, false)
        document.addEventListener('mouseup', this.mouseUpHandler, false)
        e.stopPropagation()
    }

    onMouseUpTitle(e) {
        this.removeEventListeners()
        e.stopPropagation()
    }

    onMouseMoveTitle(e) {
        let x = e.screenX - this.diffX + this.translateX
        let y = e.screenY - this.diffY + this.translateY
        this.setState({
            style: {
                transform: 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
            }
        })
        e.preventDefault()
        e.stopPropagation()
    }

    removeEventListeners() {
        document.removeEventListener('mousemove', this.mouseMoveHandler)
        document.removeEventListener('mouseup', this.mouseUpHandler)
    }

}