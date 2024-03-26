package top.ourfor.app.iPlayClient;

import android.view.SurfaceHolder;

import top.ourfor.lib.mpv.MPV;

public class PlayerViewModel implements Player {
    public String url = null;

    private MPV mpv;
    public PlayerViewModel() {
        mpv = new MPV();
    }
    public void attach(SurfaceHolder holder) {
        mpv.setDrawable(holder.getSurface());
    }

    @Override
    public void loadVideo(String url) {
        mpv.command("loadfile", url);
    }

    @Override
    public void resize(String newSize) {
        mpv.setStringTypeProperty("android-surface-size", newSize);
    }

    @Override
    public boolean isPlaying() {
        return mpv.getBoolTypeProperty("pause");
    }

    @Override
    public void resume() {
        mpv.setBoolTypeProperty("pause", false);
    }

    @Override
    public void pause() {
        mpv.setBoolTypeProperty("pause", true);
    }

    @Override
    public void stop() {
    }

    @Override
    public void destroy() {
        mpv.destroy();
    }
}
