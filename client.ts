import * as Chart from 'chart.js';
import axios from 'axios';
import {ChartDataSets} from "chart.js";

async function loadDatasets(): Promise<ChartDataSets[]> {
  console.log('--------- loadDatasets ---------');
  const response = await axios.get('/data-file-names');
  const fileNames: string[] = response.data;
  console.log('fileNames:', fileNames);
  return await Promise.all(fileNames
    .map(async fileName => {
      const response = await axios.get(`/data-files/${fileName}`)
      return JSON.parse(response.data)
    })
  )
}

async function renderChart(datasets: ChartDataSets[]) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: datasets
    },

    // Configuration options go here
    options: {}
  });
}

async function xrun() {
  console.log('---------- run --------');
  const datasets = await loadDatasets();
  console.log(datasets);
  await renderChart(datasets);
}

xrun();

