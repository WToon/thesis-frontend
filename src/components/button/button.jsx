import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus, faMinus, faHeart, faThumbsDown, faPlay, faUndo,
    faPause, faMusic, faSearch, faSave, faTrash, faQuestion,
} from '@fortawesome/free-solid-svg-icons'

class Button extends Component {

    titles = {
        addButton: "Add to seeds",
        likeButton: "Add to playlist",
        dislikeButton: "Remove from playlist",
        playButton: "Play preview",
        pauseButton: "Pause preview",
        deleteButton: "Delete playlist",
        saveButton: "Save playlist",
    }
    render() {
        const { buttonType, onClick } = this.props

        return (
            <div className="button-wrapper">
                <button className={"custom-button " + buttonType} onClick={onClick} title={this.titles[buttonType]}>
                    {buttonType === "addButton" && <FontAwesomeIcon icon={faPlus} />}
                    {buttonType === "removeButton" && <FontAwesomeIcon icon={faMinus} />}
                    {buttonType === "likeButton" && <FontAwesomeIcon icon={faHeart} />}
                    {buttonType === "dislikeButton" && <FontAwesomeIcon icon={faThumbsDown} />}
                    {buttonType === "playButton" && <FontAwesomeIcon icon={faPlay} />}
                    {buttonType === "pauseButton" && <FontAwesomeIcon icon={faPause} />}
                    {buttonType === "switchSearching" && <FontAwesomeIcon icon={faSearch} />}
                    {buttonType === "switchRecommending" && <FontAwesomeIcon icon={faMusic} />}
                    {buttonType === "saveButton" && <FontAwesomeIcon icon={faSave} />}
                    {buttonType === "deleteButton" && <FontAwesomeIcon icon={faTrash} />}
                    {buttonType === "detailButton" && <FontAwesomeIcon icon={faQuestion} />}
                    {buttonType.includes("returnButton") && <FontAwesomeIcon icon={faUndo} />}
                    {this.props.children}
                </button>
            </div>
        );
    }
}

export default Button;
