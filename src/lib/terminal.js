const lambda = { class: "green", text: "➜ " };
const pipe = { class: "purple", text: "|" };

const colorized = (text, color) =>
  text.split("").map((char) => {
    return { class: color, text: char };
  });

const command = (text) => colorized(text, "orange");

const please = command("please");
const sudo = command("sudo");
const echo = command("echo");
const npm = command("npm");
const which = command("which");

const freq = 0.3;
const spread = 8;
const seed = Math.round(Math.random() * 1000);

const rainbow = (i) => {
  const red = Math.round(Math.sin(freq * i + 0) * 127 + 128);
  const green = Math.round(Math.sin(freq * i + (2 * Math.PI) / 3) * 127 + 128);
  const blue = Math.round(Math.sin(freq * i + (4 * Math.PI) / 3) * 127 + 128);

  return { red, green, blue };
};

const lolcat = (text) => {
  return text.split("").map((char, i) => {
    const { red, green, blue } = rainbow(seed + i / spread);
    const color = `rgb(${red}, ${green}, ${blue})`;
    return { style: `color: ${color}`, text: char };
  });
};

const comment = (text) =>
  text.split("").map((char) => {
    return { class: "comment", text: char };
  });

const lines = [
  [
    lambda,
    ...comment(`# please can install commands that don't exist on your system`),
  ],
  [lambda, ...which, ...` lolcat`],
  [lambda, ...which, ...` reverse`],
  [
    lambda,
    ...echo,
    " ",
    ...colorized(`"dlrow olleH"`, "green"),
    " ",
    pipe,
    " ",
    please,
    ...` reverse`,
    " ",
    pipe,
    " ",
    please,
    ...` lolcat`,
  ],
  { text: lolcat(`Hello world`) },
  [lambda, ...comment(`# it's super easy to install please:`)],
  [
    lambda,
    ...sudo,
    " ",
    ...npm,
    " ",
    `i `,
    ...colorized("-g", "orange"),
    ...` @please.dev/cli`,
  ],
  [lambda],
];

export default lines;
