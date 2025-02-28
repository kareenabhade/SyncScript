export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  cpp: "10.2.0"
};

export const CODE_SNIPPETS = {
  javascript: `// Welcome to SyncScript!\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Coder");\n`,
  typescript: `// Welcome to SyncScript!\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Coder" });\n`,
  python: `# Welcome to SyncScript!\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Coder")\n`,
  java: `// Welcome to SyncScript!\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Coder!");\n\t}\n}\n`,
  cpp: `// Welcome to SyncScript!\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, Coder!" << std::endl;\n\treturn 0;\n}\n`
};