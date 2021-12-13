# QBasic.js

QBasic.js allows you to use QBasic inside node.js

# Example

## CLI

```sh
$ npx qbasic --source=filePath.bas
```

`index.js`
```js
const { compileFile } = require("qbasic");
const fs = require("fs");

const { bytecode } = compileFile("./demo.bas");
fs.writeFileSync("./bytecode.txt", bytecode);
```

`demo.bas`

```bas
CLS
PRINT "Hello from QBasic"
END
```

`bytecode.txt`

```txt
   ' L1 CLS
[0] syscall CLS
   ' L2 PRINT "Hello from QBasic"
[1] pushconst Hello from QBasic
[2] syscall print
[3] pushconst 

[4] syscall print
   ' L3 END
[5] end
[6] ret
[7] end
```