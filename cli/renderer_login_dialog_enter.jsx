import React from 'react'
import lanRes from './res_lan.js'
import DialogRenderer from './renderer_dialog'
import mainStyle from './style_main'
import commonRes from './res_common'
import HintRenderer from './renderer_hint'
import { eventDispatcher, netManager, loginManager } from './global'

export default class LoginEnterDialogRenderer extends DialogRenderer {

    constructor(props) {
        super(props)
        this.state = {
            hideClose: true,
            title: lanRes.enterGame,
            btns: [
                {
                    title: lanRes.enter,
                    onClick: this.onClickEnter.bind(this),
                    disable: true,
                    name: 'Enter'
                },
            ],
            selectServerIdx: '0'
        }
        eventDispatcher.addListener(
            loginManager,
            'LoginManager_getWorldServerList',
            this,
            this.onGetWorldServerList)
        eventDispatcher.addListener(
            netManager,
            'netManager_error',
            this,
            this.onServerError)
    }

    isValid() {
        if (loginManager.getWorldServerList().length < 1) {
            return false
        }
        if (/^[a-zA-Z0-9]{1,8}$/.test(this.nameInput.value)) {
            return true
        }
        return false
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.btns[0].disable = !this.isValid()
    }

    componentDidMount() {
        super.componentDidMount()
    }

    onGetWorldServerList() {
        this.setState({})
    }

    renderContent() {
        let worldServers = loginManager.getWorldServerList()
        let serverList = []
        for (let i in worldServers) {
            let name = worldServers[i].name
            serverList.push(<option key={name} value={i}>{name}</option>)
        }
        return <form
            className={mainStyle.enterDialog}
            onSubmit={this.onSubmitForm.bind(this)}>
            <label htmlFor='name'>{lanRes.enterName}</label>
            <div>
                <input
                    autoComplete='off'
                    defaultValue={this.props.playerName}
                    onInput={this.onInputName.bind(this)}
                    ref={(ref) => this.nameInput = ref}
                    id='name'
                    type='text'
                    placeholder={lanRes.nameInputHint}
                    maxLength={commonRes.nameMaxLength} />
                {this.state.hint &&
                    <HintRenderer
                        hint={this.state.hint}
                        willRemoveHint={this.willRemoveHint.bind(this)} />}
            </div>
            <label htmlFor='server'>{lanRes.serverList}</label>
            <div>
                <select
                    id='server'
                    value={this.state.selectServerIdx}
                    ref={(ref) => this.serverSelect = ref}
                    onChange={this.onSelectServer.bind(this)}>
                    {serverList}
                </select>
            </div>
        </form>
    }

    onInputName(e) {
        this.setState({})
    }

    onSelectServer(e) {
        this.setState({ selectServerIdx: e.target.value })
    }

    onServerError(netManager, name, message) {
        this.setState({ hint: lanRes[message.data] })
    }

    onClickEnter() {
        this.prepareForClose(() => {
            loginManager.enterWorld(
                this.nameInput.value,
                this.serverSelect.value
            )
        })
    }

    onSubmitForm(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.onClickEnter()
        }
    }

    willRemoveHint() {
        this.setState({ hint: null })
    }

}