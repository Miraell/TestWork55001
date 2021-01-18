<?php

namespace App\Repository;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface EloquentRepositoryInterface
{
    public function create(array $attributes): Model;

    public function find(int $id): ?Model;

    public function update(int $id, array $attributes): bool;

    public function delete(int $id): bool;

    public function all(): Collection;

}
