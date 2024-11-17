import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import { AgGridReact } from '@ag-grid-community/react';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function Chart({
  options,
  loading,
}: {
  options: GridOptions<any>,
  loading?: boolean,
}) {
  // console.log("components.grids.Grid", { options });

  return (
    <div className="Grid ag-theme-quartz">
      <AgGridReact {...{ ...options, loading }} />
    </div>
  );
}
