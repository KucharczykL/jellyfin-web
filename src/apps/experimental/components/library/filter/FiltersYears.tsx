import type { QueryFiltersLegacy } from '@jellyfin/sdk/lib/generated-client';
import React, { FC, useCallback } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LibraryViewSettings } from 'types/library';

interface FiltersYearsProps {
    filters?: QueryFiltersLegacy;
    libraryViewSettings: LibraryViewSettings;
    setLibraryViewSettings: React.Dispatch<React.SetStateAction<LibraryViewSettings>>;
}

const FiltersYears: FC<FiltersYearsProps> = ({
    filters,
    libraryViewSettings,
    setLibraryViewSettings
}) => {
    const onFiltersYearsChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const value = Number(event.target.value);
            const existingYears = libraryViewSettings?.Filters?.Years ?? [];

            const updatedYears = existingYears.includes(value) ?
                existingYears.filter((filter) => filter !== value) :
                [...existingYears, value];

            setLibraryViewSettings((prevState) => ({
                ...prevState,
                StartIndex: 0,
                Filters: {
                    ...prevState.Filters,
                    Years: updatedYears.length ? updatedYears : undefined
                }
            }));
        },
        [setLibraryViewSettings, libraryViewSettings?.Filters?.Years]
    );

    return (
        <FormGroup>
            {filters?.Years?.map((filter) => (
                <FormControlLabel
                    key={filter}
                    control={
                        <Checkbox
                            checked={
                                !!libraryViewSettings?.Filters?.Years?.includes(
                                    Number(filter)
                                )
                            }
                            onChange={onFiltersYearsChange}
                            value={String(filter)}
                        />
                    }
                    label={filter}
                />
            ))}
        </FormGroup>
    );
};

export default FiltersYears;
