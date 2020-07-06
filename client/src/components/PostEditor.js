import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToMarkdown } from 'draft-js-export-markdown';
import ReactMarkdown from 'react-markdown';

import 'draft-js/dist/Draft.css';
import './styles/PostEditor.css';

class PostEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            editorState: EditorState.createEmpty(),
            content: "",
            showPreview: false
        };

        this.onChange = editorState => this.setState({ editorState });
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.onTab = this.onTab.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);

        this.previewContent = this.previewContent.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    titleChanged(event) {
        this.setState({ title: event.target.value });
    }

    previewContent() {
        if (!this.state.showPreview) {
            this.setState({ showPreview: true });
            const current = this.state.editorState.getCurrentContent();
            const markdown = stateToMarkdown(current);
            this.setState({
                content: markdown
            });
        } else {
            this.setState({ showPreview: false });
        }

    }

    submitPost = async () => {
        var markdown = stateToMarkdown(this.state.editorState.getCurrentContent());
        var data = {
            title: this.state.title,
            content: markdown
        }

        var reqData = JSON.stringify(data);
        console.log(reqData);

        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        console.log(await response.json());
    }

    render() {
        return (
            <div className="editor-page">
                <h1>Create Post</h1>
                <input
                    className="post-title"
                    type="text"
                    value={this.state.title}
                    onChange={this.titleChanged} placeholder="Title..." />
                <div id="editor-root">
                    <BlockStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div id="post-editor">
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            handleKeyCommand={this.handleKeyCommand}
                            onTab={this.onTab}
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            textAlignment='left'
                        // spellCheck={true}
                        />
                    </div>
                </div>
                <div className="actions">
                    <button onClick={this.previewContent}>Preview Content</button>
                    <button onClick={this.submitPost}>Submit</button>
                </div>

                <div className={this.state.showPreview ? 'show-preview' : 'hide-preview'}>
                    <h1> {this.state.title} </h1>
                    <ReactMarkdown source={this.state.content} />
                </div>
            </div>
        )
    }
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle() {
    return 'align-justify';
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    // { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    // { label: 'Code Block', style: 'code-block' },
];

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'styleButton';
        if (this.props.active) {
            className += ' activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default PostEditor;