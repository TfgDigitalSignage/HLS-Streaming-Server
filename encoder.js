const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

exports.command = ffmpeg().input('/dev/video0').addOptions([
  '-s 640x360',          // 640px width, 360px height output video dimensions
  // '-strict experimental',
  '-framerate 24',
  '-hls_time 1',
  '-hls_list_size 4',
  '-hls_flags delete_segments+append_list+split_by_time',
  '-pix_fmt yuv420p',
  '-profile:v high',
  '-level 4.2',
  '-movflags +faststart'
]).videoBitrate(500)