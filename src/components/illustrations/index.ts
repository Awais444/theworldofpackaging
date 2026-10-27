import type { ComponentType } from "react";
import type { IllustrationProps } from "./primitives";
import { BrandBoard } from "./BrandBoard";
import { CollapsibleBoxAssembled, CollapsibleBoxFlat } from "./CollapsibleBox";
import { DielineFlat } from "./DielineFlat";
import { FactoryCorner, FactoryCut, FactoryInsert, FactoryQc, FactoryWrap, FoilStamping, InsertFoam, ShippingStack } from "./Factory";
import { LabelBottle } from "./LabelBottle";
import { MagneticBoxClosed, MagneticBoxOpen } from "./MagneticBox";
import { MailerBox } from "./MailerBox";
import { DisplayBox, GableBox, PillowBox, ShippingCarton, SleeveBox, TuckEndBox } from "./PrintedBoxes";
import { PressMachine } from "./PressMachine";
import { BookStyleBox, DrawerBox, LidAndBaseBox, ShoulderNeckBox, TubeBox, WindowBox } from "./RigidBoxes";
import { WorldMap } from "./WorldMap";

/** Every illustration a media slot can fall back to. */
export const illustrations = {
  "mailer-box": MailerBox,
  "magnetic-closed": MagneticBoxClosed,
  "magnetic-open": MagneticBoxOpen,
  "collapsible-flat": CollapsibleBoxFlat,
  "collapsible-assembled": CollapsibleBoxAssembled,
  "lid-and-base": LidAndBaseBox,
  drawer: DrawerBox,
  "book-style": BookStyleBox,
  "shoulder-neck": ShoulderNeckBox,
  tube: TubeBox,
  "window-box": WindowBox,
  "tuck-end": TuckEndBox,
  "shipping-carton": ShippingCarton,
  "display-box": DisplayBox,
  "pillow-box": PillowBox,
  "sleeve-box": SleeveBox,
  "gable-box": GableBox,
  "dieline-flat": DielineFlat,
  "brand-board": BrandBoard,
  "press-machine": PressMachine,
  "factory-cut": FactoryCut,
  "factory-wrap": FactoryWrap,
  "factory-corner": FactoryCorner,
  "factory-insert": FactoryInsert,
  "factory-qc": FactoryQc,
  "foil-stamping": FoilStamping,
  "insert-foam": InsertFoam,
  "shipping-stack": ShippingStack,
  "label-bottle": LabelBottle,
  "world-map": WorldMap,
} satisfies Record<string, ComponentType<IllustrationProps>>;

export type IllustrationKey = keyof typeof illustrations;

export { BrandBoard, DielineFlat, MagneticBoxClosed, MagneticBoxOpen };
export type { IllustrationProps };
