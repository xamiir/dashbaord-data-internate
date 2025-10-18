import { UsersIcon, UserCheckIcon, BikeIcon, UserIcon } from "lucide-react";
import { StatsCard } from "../widgets";
import { useEffect } from "react";
import { useStores } from "@/models/helpers";
import { observer } from "mobx-react-lite";
import { Config } from "@/config";

export const EntityStats = observer(function EntityStats() {
  const {
    usersStore: { getUsers, users },
    driversStore: { getDrivers, drivers },
    motorcyclesStore: { getMotorcycles, motorcycles },
    ownersStore: { getOwners, owners },
  } = useStores();

  useEffect(() => {
    getUsers({ page: 1, limit: 1000 });
    getDrivers({ page: 1, limit: 1000 });
    getMotorcycles({ page: 1, limit: 1000 });
    getOwners({ page: 1, limit: 1000 });
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="transform transition-transform hover:scale-105">
        <StatsCard
          title="Total Users"
          value={users.data?.length || 0}
          icon={<UsersIcon className="h-6 w-6 text-blue-500" />}
        />
      </div>

      <div className="transform transition-transform hover:scale-105">
        <StatsCard
          title="Total Drivers"
          value={drivers.data?.length || 0}
          icon={<UserCheckIcon className="h-6 w-6 text-green-500" />}
        />
      </div>

      <div className="transform transition-transform hover:scale-105">
        <StatsCard
          title="Total Motorcycles"
          value={motorcycles.data?.length || 0}
          icon={<BikeIcon className="h-6 w-6 text-red-500" />}
        />
      </div>

      <div className="transform transition-transform hover:scale-105">
        <StatsCard
          title="Total Owners"
          value={owners.data?.length || 0}
          icon={<UserIcon className="h-6 w-6 text-purple-500" />}
        />
      </div>
    </div>
  );
});
