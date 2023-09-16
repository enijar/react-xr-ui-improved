import React from "react";
import * as THREE from "three";
import { BackgroundImageRef, ContainerSize, StyleProps } from "@/lib/types";
import { useThree } from "@react-three/fiber";

const loader = new THREE.TextureLoader();

const textureCache = new Map<string, THREE.Texture>();

export default function useTexture(
  style: StyleProps,
  containerSize: ContainerSize,
  backgroundImageMeshRef: React.RefObject<BackgroundImageRef>,
) {
  const [size, setSize] = React.useState(() => containerSize);

  const capabilities = useThree((state) => state.gl.capabilities);
  const maxAnisotropy = React.useMemo(() => {
    return capabilities.getMaxAnisotropy();
  }, [capabilities]);

  React.useEffect(() => {
    const backgroundImageMesh = backgroundImageMeshRef.current;
    if (backgroundImageMesh === null) return;

    function setTexture(texture: THREE.Texture | null) {
      if (backgroundImageMesh === null) return;
      backgroundImageMesh.visible = texture !== null;
      backgroundImageMesh.material.map = texture;
      backgroundImageMesh.material.needsUpdate = true;
      if (texture === null) return;
      texture.anisotropy = maxAnisotropy;
      const aspectRatioX = texture.image.width / texture.image.height;
      const aspectRatioY = texture.image.height / texture.image.width;
      switch (style.backgroundSize) {
        case "contain":
          if (aspectRatioX > aspectRatioY) {
            // landscape
            setSize({ width: containerSize.width, height: containerSize.width * aspectRatioY });
          } else {
            // portrait/square
            setSize({ height: containerSize.height, width: containerSize.height * aspectRatioX });
          }
          break;
        case "cover":
          if (aspectRatioX > aspectRatioY) {
            // landscape
            setSize({ height: containerSize.height, width: containerSize.height * aspectRatioX });
          } else {
            // portrait/square
            setSize({ width: containerSize.width, height: containerSize.width * aspectRatioY });
          }
          break;
        case "stretch":
          setSize(containerSize);
          break;
        default:
          let [width, height] = style.backgroundSize;
          const size = { ...containerSize };
          if (typeof width === "number") {
            size.width = width;
          }
          if (typeof height === "number") {
            size.height = height;
          }
          if (typeof width === "string" && width.endsWith("%")) {
            size.width = containerSize.width * (parseFloat(width) / 100);
          }
          if (typeof height === "string" && height.endsWith("%")) {
            size.height = containerSize.height * (parseFloat(height) / 100);
          }
          if (width === "auto") {
            size.width = size.height * aspectRatioX;
          }
          if (height === "auto") {
            size.height = size.width * aspectRatioY;
          }
          setSize(size);
          break;
      }
    }

    if (style.backgroundImage === "none") {
      return setTexture(null);
    }

    const texture = textureCache.get(style.backgroundImage);
    if (texture !== undefined) {
      return setTexture(texture);
    }
    loader
      .loadAsync(style.backgroundImage)
      .then((texture) => {
        textureCache.set(style.backgroundImage, texture);
        setTexture(texture);
      })
      .catch(() => {
        backgroundImageMesh.visible = false;
        backgroundImageMesh.material.map = null;
        backgroundImageMesh.material.needsUpdate = true;
      });
  }, [style.backgroundImage, style.backgroundSize, containerSize, maxAnisotropy]);

  React.useEffect(() => {
    const backgroundImageMesh = backgroundImageMeshRef.current;
    if (backgroundImageMesh === null) return;
    let [x, y] = style.backgroundPosition;
    if (typeof x !== "number") {
      x = THREE.MathUtils.mapLinear(
        parseFloat(x) / 100,
        0,
        1,
        containerSize.width / -2 + size.width / 2,
        containerSize.width / 2 - size.width / 2,
      );
    }
    if (typeof y !== "number") {
      y = THREE.MathUtils.mapLinear(
        parseFloat(y) / 100,
        0,
        1,
        containerSize.height / 2 - size.height / 2,
        containerSize.height / -2 + size.height / 2,
      );
    }
    backgroundImageMesh.position.x = x;
    backgroundImageMesh.position.y = y;
  }, [style.backgroundPosition, size]);

  return size;
}
