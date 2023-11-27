import React from 'react';  // Import React to use JSX

// Import necessary Bootstrap components //
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

// Functional component for displaying a book item //
function BookItem(props) {
    return (
        <div>
            {/* Card component to display book information */}
            <Card>
                {/* Card header with the book title */}
                <Card.Header>{props.myBook.title}</Card.Header>
                <Card.Body>
                    {/* Blockquote to contain book cover and author */}
                    <blockquote className="blockquote mb-0">
                        {/* Image tag for the book cover */}
                        <img src={props.myBook.cover} alt={props.myBook.title} />
                        {/* Footer section for the book author */}
                        <footer>
                            {props.myBook.author}
                        </footer>
                    </blockquote>
                </Card.Body>
                {/* Link to the 'Edit' page with the book ID as part of the URL */}
                <Link to={"/edit/" + props.myBook._id} className='btn btn-primary'>Edit</Link>
            </Card>
        </div>
    );
}

// Export the BookItem component as the default export //
export default BookItem;
