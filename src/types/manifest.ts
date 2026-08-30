export interface FrameTier {
  width: number;
  height: number;
  dir: string;
}

export interface FrameManifest {
  frameCount: number;
  format: string;
  desktop: FrameTier;
  mobile: FrameTier;
  fps: number;
}
