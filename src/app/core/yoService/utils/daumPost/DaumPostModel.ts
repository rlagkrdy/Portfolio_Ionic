interface DaumPostEle {
    target: string;
    key: string;
}

const DataEleArr: Array<DaumPostEle> = [
    { target: 'ADDR', key: 'userSelectAddr' },
    { target: 'OADDR', key: 'jibunAddress' },
    { target: 'NADDR', key: 'address' },
    { target: 'ADDRST', key: 'userSelectedType' },
    { target: 'ADDRBC', key: 'bcode' },
    { target: 'ADDRZC', key: 'zonecode' }
];

const LngLatEleArr: Array<DaumPostEle> = [
    { target: 'LNG', key: 'lng' },
    { target: 'LAT', key: 'lat' }
];

export { DaumPostEle, DataEleArr, LngLatEleArr };
