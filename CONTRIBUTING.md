# Contributing to Floating Calls & Social Buttons Widget

First off, thank you for considering contributing to this project! 🎉

This is an open-source project and we love to receive contributions from our community. There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests, or writing code.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this commitment. Please be respectful, considerate, and constructive in all interactions.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards others

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Floating-Calls-Social-Buttons-for-Website-free.git
   cd Floating-Calls-Social-Buttons-for-Website-free
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/liveupx/Floating-Calls-Social-Buttons-for-Website-free.git
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Types of Contributions

#### 🐛 Bug Fixes
Found a bug? We'd love your help fixing it!

1. Check if the bug is already reported in [Issues](https://github.com/liveupx/Floating-Calls-Social-Buttons-for-Website-free/issues)
2. If not, create a new issue describing the bug
3. Fork the repo and create a fix
4. Submit a pull request

#### ✨ New Features
Have an idea for a new feature?

1. Open an issue to discuss the feature first
2. Wait for approval from maintainers
3. Implement the feature
4. Submit a pull request

#### 📚 Documentation
Help us improve our docs!

- Fix typos and grammar
- Add examples
- Improve explanations
- Translate to other languages

#### 🎨 Design
Improve the visual builder or widget appearance!

- UI/UX improvements
- New themes or styles
- Accessibility enhancements
- Icon additions

## Development Setup

### Prerequisites

- Node.js 16+ 
- npm or yarn
- A modern web browser

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/Floating-Calls-Social-Buttons-for-Website-free.git
cd Floating-Calls-Social-Buttons-for-Website-free

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

```
├── index.html       # Builder HTML
├── css/             # Builder styles
├── js/              # Builder JavaScript
├── src/             # Widget source
│   └── widget.js    # Main widget code
├── dist/            # Built/minified files
└── examples/        # Usage examples
```

### Building

```bash
# Build minified widget
npm run build

# The output will be in dist/widget.min.js
```

### Testing Locally

1. Start the development server: `npm run dev`
2. Open `http://localhost:3000` in your browser
3. Use the builder to test your changes
4. Test the generated code on a test HTML page

## Coding Standards

### JavaScript

- Use vanilla JavaScript (ES6+)
- No external dependencies
- Follow existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### CSS

- Use CSS custom properties (variables) for theming
- Follow BEM naming convention where applicable
- Ensure responsive design
- Test across browsers

### HTML

- Use semantic HTML5 elements
- Include proper ARIA attributes for accessibility
- Keep markup clean and minimal

### General Guidelines

```javascript
// Good: Clear, descriptive naming
function calculateButtonPosition(config) {
  const { vertical, horizontal, offsetX, offsetY } = config.position;
  // ...
}

// Bad: Unclear naming
function calc(c) {
  const v = c.p.v;
  // ...
}
```

```javascript
// Good: Small, focused functions
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePhone(phone) {
  const pattern = /^\+?[\d\s-()]+$/;
  return pattern.test(phone);
}

// Bad: Large, multi-purpose functions
function validate(type, value) {
  if (type === 'email') {
    // 50 lines of code
  } else if (type === 'phone') {
    // 50 more lines
  }
  // etc...
}
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commit messages
feat: add TikTok button support
fix: resolve position calculation on mobile
docs: add Shopify installation guide
style: format code with prettier
refactor: simplify event handling logic

# Bad commit messages
update code
fix bug
changes
```

## Pull Request Process

1. **Update your fork** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure your changes**:
   - Follow the coding standards
   - Include appropriate documentation
   - Don't break existing functionality
   - Work across major browsers

3. **Create a pull request**:
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changes you made and why
   - Include screenshots for UI changes

4. **PR Title Format**:
   ```
   feat: add new button type for Signal
   fix: correct z-index issue on mobile Safari
   docs: improve WordPress installation guide
   ```

5. **Wait for review**:
   - Maintainers will review your PR
   - Address any requested changes
   - Once approved, it will be merged

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Widget size remains under 10KB gzipped

## Bug Reports

When filing a bug report, please include:

### Required Information

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**:
   - Browser and version
   - Operating system
   - Widget version
   - Website/CMS platform

### Bug Report Template

```markdown
## Bug Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Widget Version: 1.0.0
- Platform: WordPress 6.4
```

## Feature Requests

We welcome feature requests! When submitting one:

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** - why is this feature needed?
4. **Suggest implementation** if you have ideas

### Feature Request Template

```markdown
## Feature Description
A clear description of the feature.

## Use Case
Why this feature would be useful.

## Proposed Solution
How you think it could be implemented.

## Alternatives Considered
Other solutions you've thought about.

## Additional Context
Any other relevant information.
```

## Questions?

- 📧 Email: [info@liveupx.com](mailto:info@liveupx.com)
- 💬 Discussions: [GitHub Discussions](https://github.com/liveupx/Floating-Calls-Social-Buttons-for-Website-free/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/liveupx/Floating-Calls-Social-Buttons-for-Website-free/issues)

---

Thank you for contributing! 🙏
