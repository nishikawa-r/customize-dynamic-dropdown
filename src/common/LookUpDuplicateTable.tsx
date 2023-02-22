import { Dialog } from '@kintone/kintone-ui-component';
import React from 'react';
import { LookUpDuplicateTable as lookUpDuplicateTable } from "@type/LookUpDuplicateTable";
export default class LookUpDuplicateTable extends React.Component<lookUpDuplicateTable.props> {
    state: {
        isVisible: boolean
    };
    constructor(props: lookUpDuplicateTable.props) {
        super(props);
        this.state = {
            isVisible: true
        };
    }

    onClose = () => {
        this.setState({ isVisible: false })
    }

    render() {
        return (
            <Dialog
                showCloseButton={true}
                header="Dialog header"
                content="This is content"
                footer="Footer"
                isVisible={this.state.isVisible}
            />
        );
    }
}
