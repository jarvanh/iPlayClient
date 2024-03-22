//
//  PlayerView.h
//  iPlayClient
//
//  Created by 赫拉 on 2024/3/20.
//

#import <UIKit/UIKit.h>
#import <MobileVLCKit/MobileVLCKit.h>
#import <React/RCTViewManager.h>
#import "PlayerEventView.h"

NS_ASSUME_NONNULL_BEGIN

@interface PlayerView : UIView<VLCMediaPlayerDelegate>
@property (nonatomic, strong) VLCMediaPlayer *player;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, assign) NSUInteger iconSize;
@property (nonatomic, weak) id<VLCMediaPlayerDelegate> delegate;
@property (nonatomic, strong) UIView *contentView;
@property (nonatomic, strong) UIView *controlView;
@property (nonatomic, strong) PlayerEventView *eventsView;
@property (nonatomic, weak) UIView *parentView;

@property (nonatomic, copy) RCTDirectEventBlock onPlayStateChange;
@end

NS_ASSUME_NONNULL_END
