export interface TransactionInputType {
    Header: {
        function: 'D' | 'A' | 'U';
        termtype: 'HTS';
        trcode: string;
        trid?: string;
        userid?: string | undefined;
        token?: string | undefined;
    };
    Input1: Record<string, any>;
}

export interface CommonTransactionOutputType {
    Header: any;
    Output?: any,
    Output1?: any,
}