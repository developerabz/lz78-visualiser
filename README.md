# LZ78 Visualiser

[Live Demo](https://developerabz.github.io/lz78-visualiser/)

## Overview

The LZ78 Visualiser is an interactive web tool that demonstrates the LZ78 (Lempel-Ziv 78) compression algorithm in action. This project helps users understand how dictionary-based compression works by visualizing the encoding process step by step.

## What is LZ78?

LZ78 is a dictionary-based lossless compression algorithm developed by Abraham Lempel and Jacob Ziv in 1978. It's one of the fundamental algorithms in the field of data compression and serves as the basis for many modern compression techniques.

### How LZ78 Works

The algorithm works by building a dictionary of phrases it encounters in the input data:

1. Initialize an empty dictionary with just the empty string
2. Scan the input string looking for the longest prefix that matches a dictionary entry
3. When no more matches are found, add the current prefix plus the next character as a new dictionary entry
4. Output a pair of numbers: (index of the matched phrase, next character)
5. Repeat from step 2 until the entire input is processed

For example, compressing "abababab":
```
Step   Input   Dictionary Entry   Output
1      a       1: a              (0,a)
2      b       2: b              (0,b)
3      ab      3: ab             (1,b)
4      ab      4: aba            (3,a)
5      b       Already exists    (2,#)
```

### Advantages of LZ78

- **Lossless Compression**: Recovers the exact original data
- **Adaptive**: Builds the dictionary based on actual data content
- **Single-pass**: Only needs to read the input once
- **No prior knowledge**: Doesn't need to know the data statistics beforehand

## Use Cases

LZ78 and its variants are used in many applications:

- Text compression in file systems
- Network data compression
- GIF image format compression
- Unix compress utility
- Early ZIP implementations

## Implementation Details

The visualizer shows:

1. The current input being processed
2. The growing dictionary of phrases
3. The compression output pairs
4. The compression ratio achieved

## Getting Started

To run this project locally:

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Enter text in the input field
4. Click "Visualise" to see the compression process

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License. 