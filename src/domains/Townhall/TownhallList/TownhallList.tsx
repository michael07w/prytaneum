import React from 'react';
import useEndpoint from 'hooks/useEndpoint';
import Loader from 'components/Loader';
import SectionList, { Section, Datum } from 'components/SectionList';
import { formatDate } from 'utils/format';
import { Typography, Fade } from '@material-ui/core';

import { getTownhallList } from '../api';
import { Townhall } from '../types';

function formatSections(list: Townhall[]): Section[] {
    interface Intermediate {
        [index: string]: Datum[];
    }
    const intermediateVal: Intermediate = list.reduce<Intermediate>(
        (accum, townhall) => {
            const formattedDate = formatDate(new Date(townhall.date), 'P');
            const copy = { ...accum };
            const datum: Datum = {
                image: townhall.picture,
                title: townhall.speaker.name,
                subtitle: `${townhall.speaker.party}, ${townhall.speaker.territory}`,
                href: `/townhalls/${townhall._id}`,
            };
            if (copy[formattedDate] !== undefined) {
                copy[formattedDate].push(datum);
            } else {
                copy[formattedDate] = [datum];
            }
            return copy;
        },
        {}
    );
    return Object.keys(intermediateVal).map((key) => {
        const datums: Datum[] = intermediateVal[key];
        return { title: key, sectionData: datums };
    });
}

export default function TownhallList() {
    const [list, setList] = React.useState<Townhall[] | null>(null);
    const [sendRequest, isLoading] = useEndpoint(getTownhallList, {
        onSuccess: (results) => {
            setList(results.data.list);
        },
    });

    React.useEffect(sendRequest, []);
    if (isLoading || !list) {
        return <Loader />;
    }
    if (list.length === 0) {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Typography variant='h4'>No Townhalls to display</Typography>
            </div>
        );
    }
    return (
        <Fade in={!isLoading || !list} timeout={400} unmountOnExit>
            <div>
                <SectionList sections={formatSections(list)} />
            </div>
        </Fade>
    );
}
