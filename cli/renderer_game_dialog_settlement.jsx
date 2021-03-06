import React from 'react'
import lanRes from './res_lan.js'
import DialogRenderer from './renderer_dialog'
import mainStyle from './style_main'
import {util, scheduler, eventDispatcher, gameManager} from './global'

export default class GameDialogSettlementRenderer extends DialogRenderer {

    constructor(props) {
        super(props)
        this.state = {
            btns: [
                {
                    title: lanRes.continue,
                    onClick: this.onClickContinue.bind(this),
                    name: 'Continue'
                },
                {
                    title: lanRes.backToHall,
                    onClick: this.onClickBackToHall.bind(this),
                    name: 'BackToHall'
                }
            ]
        }
        this.gameTimer = scheduler.schedule(1000, this.update.bind(this))
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        scheduler.unschedule(this.gameTimer)
    }

    update() {
        this.forceUpdate()
    }

    renderContent() {
        let settlementData = this.props.settlementData
        return <div className={mainStyle.gameSettlementDialog}>
            <h1
                dangerouslySetInnerHTML={
                    {
                        __html: util.format(
                            lanRes.eatenBy,
                            '<span>' + settlementData.attackerName + '</span>'
                        )
                    }
                }>

            </h1>
            <div>
                <div>
                    <span>{lanRes.finalWeight}</span>
                    <span>
                        {util.toFixed(settlementData.weight, 1) + lanRes.mg}
                    </span>
                </div>
                <div>
                    <span>{lanRes.eatenCount}</span>
                    <span>{settlementData.eatenCount}</span>
                </div>
                <div>
                    <span>{lanRes.liveTime}</span>
                    <span>{util.timeFormat(settlementData.liveTime, 'mm:ss')}</span>
                </div>
            </div>
            <div>
                <span>{lanRes.leftTime}</span>
                <span>
                    {util.timeFormat(gameManager.getLeftTime(), 'mm:ss')}
                </span>
            </div>
        </div>
    }

    onClickContinue() {
        this.prepareForClose(() => {
            this.props.onClickContinue()
        })
    }

    onClickBackToHall() {
        this.prepareForClose(() => {
            gameManager.backToHall()
        })
    }

}