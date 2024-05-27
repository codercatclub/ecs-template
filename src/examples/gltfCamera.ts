import { World, extend } from "../ecs/index";
import { Asset, PointLight } from "../ecs/archetypes";
import { RenderSystem } from "../systems/core/RenderSystem";
import { StandardPrimitiveSystem } from "../systems/core/StandardPrimitiveSystem";
import { Object3DSystem } from "../systems/core/Object3DSystem";
import { AssetManager } from "../ecs/assetManager";
import { Vector3 } from "three";
import { GLTFCameraC } from "../ecs/components";
import { GLTFCameraSystem } from "../systems/core/GLTFCameraSystem";
import { AssetSystem } from "../systems/core/AssetSystem";
import { PointLightSystem } from "../systems/core/PointLightSystem";

/** 
 * This example demonstrate how to load camera from GLTF file
 * */

export default async () => {
  const assetManager = new AssetManager();

  assetManager.addAsset("assets/models/suzanne_scene.glb");

  // Wait until all assets are loaded
  await assetManager.load();

  console.log(assetManager.loadedAssets)

  // Make sure to pass assets to the world!
  const world = new World(assetManager.loadedAssets);

  // Grab Suzanne object from GLTF file by providing "part" property
  const suzanne = Asset({ src: "assets/models/suzanne_scene.glb", part: "Scene/Suzanne" });

  const light = PointLight({ position: new Vector3(1, 1, 1) });
  
  // Add GLTFCamera component to our asset
  const cam = extend(
    Asset({ src: "assets/models/suzanne_scene.glb", part: "Scene/Camera" }),
    [GLTFCameraC]
  );

  world
    .addEntity(suzanne)
    .addEntity(light)
    .addEntity(cam);

  world
    .registerSystem(RenderSystem)
    .registerSystem(Object3DSystem)
    .registerSystem(AssetSystem)
    .registerSystem(StandardPrimitiveSystem)
    .registerSystem(PointLightSystem)
    .registerSystem(GLTFCameraSystem);

  console.log("world ", world)

  return world;
};
