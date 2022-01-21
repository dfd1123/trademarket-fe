export interface TransactionInputType {
    Header: {
        function: 'D' | 'A';
        termtype: 'HTS';
        trcode: string;
        trid?: string;
        userid?: string | undefined;
        token?: string | undefined;
    };
    Input1: Record<string, any>;
}