//
//  MPVViewModel.h
//  iPlayClient
//
//  Created by 赫拉 on 2024/3/25.
//

#import <Foundation/Foundation.h>
#import "VideoPlayer.h"
#import <UIKit/UIKit.h>
@import MPVKit;

NS_ASSUME_NONNULL_BEGIN

@interface PlayerViewModel : NSObject<VideoPlayer>
@property (nonatomic, nullable) mpv_handle *mpv;
@property (nonatomic) NSUInteger duration;
@property (nonatomic) BOOL isPlaying;
- (instancetype)initWithLayer:(CAMetalLayer *)layer;
@end

NS_ASSUME_NONNULL_END
