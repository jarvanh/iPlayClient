import { useAppDispatch, useAppSelector } from "@hook/store"
import { startPlayAsync, stopPlayAsync, trackPlayAsync } from "@store/playerSlice"
import { throttle } from "lodash"
import { useEffect } from "react"

export type Callable = () => void

const kTimeInterval = 10 * 1000
const throttleUpdate = throttle((callable: Callable) => {
    callable()
}, kTimeInterval)

export function PlayerMonitor() {
    const player = useAppSelector(state => state.player)
    const emby = useAppSelector(state => state.emby.emby)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (player.status === "playing") {
            throttleUpdate(() => {
                dispatch(trackPlayAsync({isPause: false}))
            })
        } else if (player.status === "paused") {
            throttleUpdate.cancel()
            dispatch(trackPlayAsync({isPause: true}))
        } else if (player.status === "start") {
            dispatch(startPlayAsync())
        } else if (player.status === "stopped") {
            dispatch(stopPlayAsync())
        }
    }, [player, emby, dispatch])

    useEffect(() => {
        dispatch(stopPlayAsync())
        return () => throttleUpdate.cancel()
    }, [])
    return null
}