<?php

namespace App\Repository;

use App\Repository\EloquentRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class BaseRepository implements EloquentRepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    public function update(int $id, array $attributes): bool
    {
        return $this->model->find($id)->update($attributes);
    }

    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    public function delete(int $id): bool
    {
        return $this->model->find($id)->delete();
    }

    public function all(): Collection
    {
        return $this->model->all();
    }
}
