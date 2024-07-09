import React, { useCallback } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './textEditor.scss';

export const TextEditor = ({ editorState, setEditorState, handleKeyCommand }) => {
    const focus = useCallback((e) => {
        e.preventDefault();
        const editorElement = document.querySelector('.DraftEditor-root');
        if (editorElement) {
            editorElement.focus();
        }
    }, []);

    const toggleInlineStyle = useCallback((e, inlineStyle) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
        focus(e);
    }, [editorState, setEditorState, focus]);

    const toggleBlockType = useCallback((e, blockType) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
        focus(e);
    }, [editorState, setEditorState, focus]);

    const currentStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className='textEditor'>
            <div className='toolbar'>
                <button 
                    type="button" 
                    onClick={(e) => toggleInlineStyle(e, 'BOLD')}
                    className={currentStyle.has('BOLD') ? 'active' : ''}
                >B</button>
                <button 
                    type="button" 
                    onClick={(e) => toggleInlineStyle(e, 'ITALIC')}
                    className={currentStyle.has('ITALIC') ? 'active' : ''}
                >I</button>
                <button 
                    type="button" 
                    onClick={(e) => toggleInlineStyle(e, 'UNDERLINE')}
                    className={currentStyle.has('UNDERLINE') ? 'active' : ''}
                >U</button>
                <button 
                    type="button" 
                    onClick={(e) => toggleBlockType(e, 'unordered-list-item')}
                    className={blockType === 'unordered-list-item' ? 'active' : ''}
                >UL</button>
                <button 
                    type="button" 
                    onClick={(e) => toggleBlockType(e, 'ordered-list-item')}
                    className={blockType === 'ordered-list-item' ? 'active' : ''}
                >OL</button>
                <button 
                    type="button" 
                    onClick={(e) => toggleBlockType(e, 'header-one')}
                    className={blockType === 'header-one' ? 'active' : ''}
                >H1</button>
                <button 
                    type="button" 
                    onClick={(e) => toggleBlockType(e, 'header-two')}
                    className={blockType === 'header-two' ? 'active' : ''}
                >H2</button>
                <button 
                    type="button" 
                    onClick={(e) => toggleBlockType(e, 'blockquote')}
                    className={blockType === 'blockquote' ? 'active' : ''}
                >Quote</button>
            </div>
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={setEditorState}
            />
        </div>
    );
};

export const useTextEditor = () => {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const getRawContent = () => {
        const content = editorState.getCurrentContent();
        return JSON.stringify(convertToRaw(content));
    };

    return {
        editorState,
        setEditorState,
        handleKeyCommand,
        getRawContent,
    };
};