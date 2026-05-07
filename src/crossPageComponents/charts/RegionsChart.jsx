import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReactModule from 'highcharts-react-official';

const HighchartsReact = HighchartsReactModule.default || HighchartsReactModule;

import HC_heatmap from 'highcharts/modules/heatmap';
import HC_tilemap from 'highcharts/modules/tilemap';

if (typeof Highcharts === 'object') {
    if (typeof HC_heatmap === 'function') {
        HC_heatmap(Highcharts);
    } else if (HC_heatmap && typeof HC_heatmap.default === 'function') {
        HC_heatmap.default(Highcharts);
    }

    if (typeof HC_tilemap === 'function') {
        HC_tilemap(Highcharts);
    } else if (HC_tilemap && typeof HC_tilemap.default === 'function') {
        HC_tilemap.default(Highcharts);
    }
}

const RegionsChart = ({ partners, allRegions }) => {
    const chartOptions = useMemo(() => {
        if (!partners || !allRegions) return {};

        const regionCounts = {};
        partners.forEach(partner => {
            if (partner.regions && partner.regions.length > 0) {
                partner.regions.forEach(regId => {
                    regionCounts[regId] = (regionCounts[regId] || 0) + 1;
                });
            } else {
                regionCounts['unassigned'] = (regionCounts['unassigned'] || 0) + 1;
            }
        });

        const columns = 4; 
        const tileData = [];
        let currentIndex = 0;

        allRegions.forEach((region) => {
            tileData.push({
                name: region.name,
                x: currentIndex % columns,
                y: Math.floor(currentIndex / columns),
                value: regionCounts[region.id] || 0 
            });
            currentIndex++;
        });

        if (regionCounts['unassigned'] > 0) {
            tileData.push({
                name: 'Unassigned',
                x: currentIndex % columns,
                y: Math.floor(currentIndex / columns),
                value: regionCounts['unassigned']
            });
        }

        return {
            chart: {
                type: 'tilemap',
                inverted: true,
                height: '100%',
                backgroundColor: 'transparent'
            },
            title: {
                text: 'Partners per Region'
            },
            xAxis: { visible: false },
            yAxis: { visible: false },
            
            colorAxis: {
                min: 0,
                minColor: '#e6f2ff', 
                maxColor: '#0052cc',
                stops: [
                    [0, '#f8f9fa'], 
                    [0.1, '#cce0ff'],
                    [1, '#0052cc']
                ]
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<b>{point.name}</b><br/>Partners: <b>{point.value}</b>'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            const name = this.point.name || '';
                            if (name === 'Unassigned') return 'Un'; // Optional custom override
                            if (name.length < 2) return name.toUpperCase();
                            
                            return name.charAt(0).toUpperCase() + name.charAt(1).toLowerCase();
                        },
                        color: '#000000',
                        style: {
                            textOutline: false,
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
            series: [{
                name: 'Regions',
                data: tileData
            }],
            credits: { enabled: false }
        };
    }, [partners, allRegions]);

    return (
        <div className="mt-4">
            {allRegions.length > 0 ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            ) : (
                <p className="text-muted text-center mt-3">No regional data available.</p>
            )}
        </div>
    );
};

export default RegionsChart;