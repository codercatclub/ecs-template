import { extend, World } from "../ecs/index";
import { StandardPrimitive } from "../ecs/archetypes";
import { RenderSystem } from "../systems/core/RenderSystem";
import { StandardPrimitiveSystem } from "../systems/core/StandardPrimitiveSystem";
import { Object3DSystem } from "../systems/core/Object3DSystem";
import { OrbitControlsSystem } from "../systems/core/OrbitControlsSystem";
import { IntervalSpawnerC } from "../ecs/components";
import { IntervalSpawnSystem } from "../systems/core/IntervalSpawnSystem";
import { Vector3 } from "three";

/** This example demonstrate how to add entities at runtime */
export default async () => {
  const world = new World();

  const cube = StandardPrimitive({ type: "Sphere", scale: new Vector3(0.1, 0.1, 0.1)});

  const cubeSpawner = extend(cube, [IntervalSpawnerC]);

  world.addEntity(cubeSpawner);

  world
    .registerSystem(RenderSystem)
    .registerSystem(Object3DSystem)
    .registerSystem(OrbitControlsSystem)
    .registerSystem(StandardPrimitiveSystem)
    .registerSystem(IntervalSpawnSystem)

  return world;
};
