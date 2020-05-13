import React from "react";
import { Segment, Button } from "semantic-ui-react";
export default () => (
    <Segment basic class="social-container">
        <Button
            circular
            color="facebook"
            href="#"
            class="social"
            icon="facebook"
        />
        <Button
            circular
            color="google plus"
            href="#"
            class="social"
            icon="google plus"
        />
        <Button
            circular
            color="linkedin"
            href="#"
            class="social"
            icon="linkedin"
        />
    </Segment>
);
