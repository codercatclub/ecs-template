import { World } from "./ecs/index";
import { RenderSystem } from "./systems/core/RenderSystem";
import { Object3DSystem } from "./systems/core/Object3DSystem";
import { AssetManager } from "./ecs/assetManager";
import { StandardPrimitive } from "./ecs/archetypes";
import { AssetSystem } from "./systems/core/AssetSystem";
import { OrbitControlsSystem } from "./systems/core/OrbitControlsSystem";

import { StandardPrimitiveSystem } from "./systems/core/StandardPrimitiveSystem";
import { StatsSystem } from "./systems/core/StatsSystem";

(async () => {
  const world = new World();

  const cube = StandardPrimitive({ type: "Box" });
  world.addEntity(cube);

  world
    .registerSystem(RenderSystem.configure({}))
    .registerSystem(Object3DSystem)
    .registerSystem(AssetSystem)
    .registerSystem(StandardPrimitiveSystem)
    .registerSystem(OrbitControlsSystem)
    .registerSystem(StatsSystem)

  world.init();
})();
