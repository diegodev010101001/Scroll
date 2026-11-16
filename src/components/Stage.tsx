import { Fragment, type CSSProperties } from "react";
import { IconCheck } from "@/components/art/icons";
import ScenePhoto from "@/components/art/ScenePhoto";
import SplitWords from "@/components/SplitWords";
import StageScroller from "@/components/StageScroller";
import { scenes, type Scene } from "@/config/scenes";
import styles from "./Stage.module.css";

const pad = (value: number) => String(value).padStart(2, "0");

/** Variables CSS que hacen que cada giro se sienta como otro sitio. */
function sceneVars(scene: Scene, index: number, total: number): CSSProperties {
  const { palette, typography } = scene;
  return {
    "--s-bg": palette.bg,
    "--s-surface": palette.surface,
    "--s-ink": palette.ink,
    "--s-muted": palette.muted,
    "--s-accent": palette.accent,
    "--s-on-accent": palette.onAccent,
    "--s-font": typography.font,
    "--s-weight": typography.weight,
    "--s-transform": typography.uppercase ? "uppercase" : "none",
    "--s-tracking": typography.letterSpacing,
    "--s-leading": typography.lineHeight,
    "--s-scale": typography.scale,
    "--s-em-style": typography.italicEmphasis ? "italic" : "normal",
    "--s-progress": (index + 1) / total,
  } as CSSProperties;
}

function SceneView({ scene, index, total }: { scene: Scene; index: number; total: number }) {
  const { Art, photo } = scene;
  const titleId = `giro-${scene.id}`;

  return (
    <article
      className={styles.scene}
      style={sceneVars(scene, index, total)}
      data-stage-scene
      data-scene={scene.id}
      data-layout={scene.layout}
      data-chip={scene.chip}
      aria-labelledby={titleId}
    >
      <div className={styles.art} aria-hidden="true">
        <div className={styles.zoom} data-stage-zoom>
          {photo ? <ScenePhoto {...photo} /> : <Art />}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.brandRow} data-stage-fade>
            <span className={styles.brandName}>{scene.brand}</span>
            <span className={styles.tag}>Ejemplo · {scene.label}</span>
          </p>

          <h2 id={titleId} className={styles.title}>
            <SplitWords text={scene.title} />
          </h2>

          <p className={styles.desc} data-stage-fade>
            {scene.description}
          </p>

          <p className={styles.servicesLabel} data-stage-fade>
            {scene.servicesLabel}
          </p>
          <ul className={styles.chips}>
            {scene.services.map((service) => (
              <li key={service} className={styles.chip} data-stage-chip>
                <IconCheck className={styles.chipIcon} />
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.hud}>
          <p className={styles.counter}>
            <span className="sr-only">Giro </span>
            <span className={styles.counterNow}>{pad(index + 1)}</span>
            <span className="sr-only"> de </span>
            <span className={styles.counterTotal} aria-hidden="true">
              /
            </span>
            <span className={styles.counterTotal}>{pad(total)}</span>
          </p>
          <span className={styles.progress} aria-hidden="true">
            <span className={styles.progressFill} data-stage-progress />
          </span>
          <p className={styles.hudLabel} aria-hidden="true">
            {scene.label}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * Escenario de los cuatro giros. Se queda fijo mientras el usuario hace
 * scroll y cada escena de src/config/scenes.ts se abre sobre la anterior.
 */
export default function Stage() {
  const total = scenes.length;

  return (
    <StageScroller
      id="giros"
      className={styles.stage}
      style={{ "--scene-count": total } as CSSProperties}
      aria-label="Una página, cuatro giros: ejemplos por tipo de negocio"
    >
      <div className={styles.pin} data-stage-pin>
        {scenes.map((scene, index) => (
          <Fragment key={scene.id}>
            {index > 0 ? (
              <div
                className={styles.wipe}
                style={{ background: scene.palette.accent }}
                data-stage-wipe
                aria-hidden="true"
              />
            ) : null}
            <SceneView scene={scene} index={index} total={total} />
          </Fragment>
        ))}
      </div>
    </StageScroller>
  );
}
