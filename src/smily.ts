// - [x] String reverse with smiley
function reversewithSmiley2(s: string) {
  const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return Array.from(seg.segment(s), (x) => x.segment)
    .reverse()
    .join("");
}

reversewithSmiley2("ab😊jk👍🏽a🙂");
