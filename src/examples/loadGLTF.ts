import { World } from "../ecs/index";
import { RenderSystem } from "../systems/core/RenderSystem";
import { Object3DSystem } from "../systems/core/Object3DSystem";
import { AssetManager } from "../ecs/assetManager";
import { Asset, PointLight } from "../ecs/archetypes";
import { OrbitControlsSystem } from "../systems/core/OrbitControlsSystem";
import { AssetSystem } from "../systems/core/AssetSystem";
import { PointLightSystem } from "../systems/core/PointLightSystem";
import { Vector3 } from "three";

/** Basic example of loading GLTF model and working with Asset System */
export default async () => {
  const assetManager = new AssetManager();

  assetManager.addAsset("assets/models/suzanne.glb", "suzanne");

  // Wait until all assets are loaded
  await assetManager.load();

  // Make sure to pass assets to the world!
  const world = new World(assetManager.loadedAssets);

  const suzanne = Asset({ src: "assets/models/suzanne.glb" });
  const light = PointLight({ position: new Vector3(1, 1, 1)});

  world.addEntity(suzanne).addEntity(light);

  world
    .registerSystem(RenderSystem)
    .registerSystem(Object3DSystem)
    .registerSystem(AssetSystem)
    .registerSystem(PointLightSystem)
    .registerSystem(OrbitControlsSystem);

  return world;
};
