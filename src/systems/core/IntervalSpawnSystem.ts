import { newEntity, System, World, Entity } from "../../ecs/index";
import { TransformC, IntervalSpawnerC, Object3DC } from "../../ecs/components";
import { applyQuery } from "../../ecs/index";
import { Vector3 } from "three";
import { getComponent } from "./utils";

interface IntervalSpawnSystem extends System {
  world: World | null;
  entities: Entity[];
  lastTime: number;
  count: number;
  maxCount: number;
  spawnDelay: number;
}

export const IntervalSpawnSystem: IntervalSpawnSystem = {
  type: "MoveSystem",
  queries: [TransformC, Object3DC, IntervalSpawnerC],
  entities: [],
  world: null,
  lastTime: 0,
  count: 0,
  maxCount: 1500,
  spawnDelay: 0.01,

  init: function (world) {
    this.world = world;
    this.entities = applyQuery(world.entities, this.queries);

    this.entities.forEach((ent) => {
      // Remove that object from the scene since we going to procedurally spawn bunch on them in the tick
      this.world?.removeEntity(ent.id);
    });
  },

  tick: function (time) {
    if (time - this.lastTime > this.spawnDelay && this.count < this.maxCount) {
      const i = this.count / 10;

      this.entities.forEach((ent) => {
        const oldC = Array.from(ent.components, ([k, v]) => ({
          type: k,
          data: v,
        })).filter(c => c.type !== "TransformC");

        const transform = getComponent(ent, TransformC);
  
        const newC = [
          ...oldC,
          {
            ...TransformC,
            data: { ...transform, position: new Vector3(Math.cos(i*20), Math.sin(i*20), -i) },
          },
        ];

        const spawnEntity = newEntity(newC);

        this.world?.addEntity(spawnEntity);
      });

      this.lastTime = time;
      this.count++;
    }
  },
};
