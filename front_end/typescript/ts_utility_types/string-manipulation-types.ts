{
  type S = 'superfree';
  type C = 'crystal';
  type Names = S | C;

  type UpperNames = Uppercase<Names>;
  // type UpperNames = "SUPERFREE" | "CRYSTAL"
  type LowerNames = Lowercase<Names>;
  // type LowerNames = "superfree" | "crystal"
  type CapNames = Capitalize<Names>;
  // type CapNames = "Superfree" | "Crystal"

  type UnCapNames = Uncapitalize<UpperNames>;
  // type UnCapNames = "sUPERFREE" | "cRYSTAL"

  type collect = UpperNames | LowerNames | CapNames | UnCapNames;
}
