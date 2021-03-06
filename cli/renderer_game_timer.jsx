import Renderer from './renderer'
import React from 'react'
import mainStyle from './style_main'
import {util, scheduler, gameManager} from './global'

export default class GameTimerRenderer extends Renderer {

    constructor(props) {
        super(props)
        this.gameTimer = scheduler.schedule(1000, this.update.bind(this))
    }

    update(dt) {
        this.setState({})
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
        super.componentWillUnmount()
        scheduler.unschedule(this.gameTimer)
    }

    render() {
        return <div className={mainStyle.gameTimer}>
            {util.timeFormat(gameManager.getLeftTime(), 'mm:ss')}
        </div>
    }

}