// An interface that describes the properties
// that a User Document has (Can include default fields like title and timestamps here)
import { Document } from 'mongoose';

interface PostDoc extends Document {
    title: string;
    body: string;
}

export default PostDoc;