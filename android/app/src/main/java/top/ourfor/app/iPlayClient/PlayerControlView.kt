package top.ourfor.app.iPlayClient

import android.content.Context
import android.graphics.Color
import android.graphics.drawable.GradientDrawable
import android.util.Log
import android.view.View
import android.widget.ImageView
import androidx.constraintlayout.widget.ConstraintLayout

class PlayerControlView(context: Context) : ConstraintLayout(context) {
    private var playButton: View = run {
        val layout = ConstraintLayout(context)
        val icon = ImageView(context)
        icon.setImageResource(androidx.media3.ui.R.drawable.exo_icon_play)
        val iconLayout = LayoutParams(CENTER_LAYOUT)
        iconLayout.width = ICON_SIZE
        iconLayout.height = ICON_SIZE
        layout.addView(icon, iconLayout)
        val gradientDrawable = GradientDrawable()
        gradientDrawable.setColor(Color.argb(50, 0, 0, 0))
        gradientDrawable.cornerRadius = ICON_SIZE + 0f
        layout.background = gradientDrawable
        layout.rootView
    }

    private var playButtonLayout = run {
        val params = LayoutParams(ICON_SIZE * 2, ICON_SIZE * 2)
        params.topToTop = LayoutParams.PARENT_ID
        params.bottomToBottom = LayoutParams.PARENT_ID
        params.rightToRight = LayoutParams.PARENT_ID
        params.leftToLeft = LayoutParams.PARENT_ID
        params
    }

    private var fullscreenButton = run {
        val layout = ConstraintLayout(context)
        val icon = ImageView(context)
        icon.setImageResource(androidx.media3.ui.R.drawable.exo_icon_fullscreen_enter)
        val iconLayout = LayoutParams(CENTER_LAYOUT)
        iconLayout.width = ICON_SIZE
        iconLayout.height = ICON_SIZE
        layout.addView(icon, iconLayout)
        val gradientDrawable = GradientDrawable()
        gradientDrawable.setColor(Color.argb(50, 0, 0, 0))
        gradientDrawable.cornerRadius = ICON_SIZE + 0f
        layout.background = gradientDrawable
        layout.rootView
    }

    private var fullscreenLayout = run {
        val params = LayoutParams(ICON_SIZE * 2, ICON_SIZE * 2)
        params.topToTop = LayoutParams.PARENT_ID
        params.rightToRight = LayoutParams.PARENT_ID
        params
    }


    init {
        setupUI()
        bind()
    }

    private fun setupUI() {
        addView(playButton, playButtonLayout)
        addView(fullscreenButton, fullscreenLayout)
    }

    private fun bind() {
        playButton.setOnClickListener {
            Log.d(TAG, "play")
        }
    }

    companion object {
        val TAG = "PlayerControlView"

        val CENTER_LAYOUT = run {
            val centerParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)
            centerParams.topToTop = LayoutParams.PARENT_ID;
            centerParams.leftToLeft = LayoutParams.PARENT_ID
            centerParams.rightToRight = LayoutParams.PARENT_ID
            centerParams.bottomToBottom = LayoutParams.PARENT_ID
            centerParams
        }

        val ICON_SIZE = 36 * 3
    }
}