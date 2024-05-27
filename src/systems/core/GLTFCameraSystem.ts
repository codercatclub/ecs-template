import { System } from "../../ecs/index";
import { TransformC, Object3DC, GLTFCameraC } from "../../ecs/components";
import { applyQuery } from "../../ecs/index";
import { getComponent } from "./utils";
import { PerspectiveCamera } from "three";
import { RenderSystem } from "./RenderSystem";

export interface GLTFCameraSystem extends System {}

export const GLTFCameraSystem: GLTFCameraSystem = {
  type: "GLTFCameraSystem",
  queries: [TransformC, Object3DC, GLTFCameraC],

  init: function (world) {
    this.entities = applyQuery(world.entities, this.queries);

    // We assume there only one camera in the scene
    if (this.entities.length > 0) {

      const ent = this.entities[0];
      const { object3d } = getComponent(ent, Object3DC);

      const cam = object3d.getObjectByProperty(
        "type",
        "PerspectiveCamera"
      ) as PerspectiveCamera;

      // Set aspect ratio based on window size
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.updateProjectionMatrix();

      const renderSystem = world.getSystem<RenderSystem>(RenderSystem.type);
      renderSystem?.setCamera(cam);
    }

  },
};
