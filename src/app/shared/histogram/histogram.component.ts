import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DEPARTEMENTS } from 'src/app/models/departements';
import { ListAbsByEmployeeHttpService } from 'src/app/providers/listAbsByEmployee-http-service';
import { IgxCategoryXAxisComponent } from "igniteui-angular-charts";
import { IgxCategoryYAxisComponent } from "igniteui-angular-charts";
import { IgxDataChartComponent } from "igniteui-angular-charts";
import { IgxNumericXAxisComponent } from "igniteui-angular-charts";
import { IgxNumericYAxisComponent } from "igniteui-angular-charts";
import { IgxStacked100AreaSeriesComponent } from "igniteui-angular-charts";
import { IgxStacked100BarSeriesComponent } from "igniteui-angular-charts";
import { IgxStacked100ColumnSeriesComponent } from "igniteui-angular-charts";
import { IgxStacked100LineSeriesComponent } from "igniteui-angular-charts";
import { IgxStacked100SplineSeriesComponent } from "igniteui-angular-charts";
import { IgxStackedAreaSeriesComponent } from "igniteui-angular-charts";
import { IgxStackedBarSeriesComponent } from "igniteui-angular-charts";
import { IgxStackedColumnSeriesComponent } from "igniteui-angular-charts";
import { IgxStackedFragmentSeriesComponent } from "igniteui-angular-charts";
import { IgxStackedLineSeriesComponent } from "igniteui-angular-charts";
import { IgxStackedSplineSeriesComponent } from "igniteui-angular-charts";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss'],
})
export class HistogramComponent implements OnInit {
  public data!: any[];

  public catXAxis!: IgxCategoryXAxisComponent;
  public numYAxis!: IgxNumericYAxisComponent;

  public catYAxis!: IgxCategoryYAxisComponent;
  public numXAxis!: IgxNumericXAxisComponent;

  @ViewChild("chart", { static: true})
  public chart!: IgxDataChartComponent;


  constructor(private service: ListAbsByEmployeeHttpService) {
 this.catXAxis = new IgxCategoryXAxisComponent();
        this.catXAxis.label = "Days of Month";

        this.catYAxis = new IgxCategoryYAxisComponent();
        this.catYAxis.label = "Synthèse par jour";

        this.numXAxis = new IgxNumericXAxisComponent();
        this.numYAxis = new IgxNumericYAxisComponent();

        this.initData();
}

  public ngOnInit() {
        this.setSeries("Stacked Column");
    }

  onChange() {}


  private initData(): void {
    this.getData();
}

  getData() {
    this.service.get("2").forEach((data) => console.log(`data :`, data));
  }

  public getFragments(): IgxStackedFragmentSeriesComponent[] {
        const fragment1 = new IgxStackedFragmentSeriesComponent();
        fragment1.valueMemberPath = "USA";
        fragment1.title = "USA";
        const fragment2 = new IgxStackedFragmentSeriesComponent();
        fragment2.valueMemberPath = "Europe";
        fragment2.title = "Europe";
        const fragment3 = new IgxStackedFragmentSeriesComponent();
        fragment3.valueMemberPath = "China";
        fragment3.title = "China";

        const fragments: IgxStackedFragmentSeriesComponent[] = [];
        fragments.push(fragment1);
        fragments.push(fragment2);
        fragments.push(fragment3);
        return fragments;
    }

    public onSeriesTypeChanged(e: any) {
        const selectedSeries = e.target.value.toString();
        this.chart.series.clear();
        this.setSeries(selectedSeries);
    }

    public setSeries(seriesType: string) {

        this.chart.axes.clear();
        this.chart.series.clear();

        const fragments = this.getFragments();

        if (seriesType === "Stacked Column") {
            const stack = new IgxStackedColumnSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked 100 Column") {
            const stack = new IgxStacked100ColumnSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked Area") {
            const stack = new IgxStackedAreaSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked 100 Area") {
            const stack = new IgxStacked100AreaSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked Line") {
            const stack = new IgxStackedLineSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked 100 Line") {
            const stack = new IgxStacked100LineSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked Spline") {
            const stack = new IgxStackedSplineSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked 100 Spline") {
            const stack = new IgxStacked100SplineSeriesComponent();
            stack.xAxis = this.catXAxis;
            stack.yAxis = this.numYAxis;
            this.chart.axes.add(this.catXAxis);
            this.chart.axes.add(this.numYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked Bar") {
            const stack = new IgxStackedBarSeriesComponent();
            stack.xAxis = this.numXAxis;
            stack.yAxis = this.catYAxis;
            this.chart.axes.add(this.numXAxis);
            this.chart.axes.add(this.catYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }
            this.chart.series.add(stack);

        } else if (seriesType === "Stacked 100 Bar") {
            const stack = new IgxStacked100BarSeriesComponent();
            stack.xAxis = this.numXAxis;
            stack.yAxis = this.catYAxis;
            this.chart.axes.add(this.numXAxis);
            this.chart.axes.add(this.catYAxis);
            for (const frag of fragments) {
                stack.series.add(frag);
            }

            this.chart.series.add(stack);
        }
    }


  getDaysInMonth(year: number, month: number): number {
  // Create a new Date object with the specified year and month
  const date = new Date(year, month - 1, 1);

  // Move to the next month by setting the day to 0 (last day of the previous month)
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);

  // Retrieve the day of the month, which represents the number of days in the specified month
  return date.getDate();
}

}
